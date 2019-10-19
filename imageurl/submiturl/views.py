from django.shortcuts import render
from .serializers import UploadSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from urllib.request import urlopen
import urllib.parse, urllib.error
from bs4 import BeautifulSoup
import traceback
from django.http import JsonResponse

class URLView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        posts_serializer = UploadSerializer(data=request.data)

        if posts_serializer.is_valid():
            try:
                file_data = request.FILES['datafile'].read().decode("utf-8")
            except (IOError,ValueError) as e:
                # print('error', e)
                return Response(e, status=status.HTTP_400_BAD_REQUEST)
            
            return JsonResponse(self.__urlExtract(file_data), safe=False, status=status.HTTP_201_CREATED)

        else:
            # print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def __urlExtract(self, text_data):
        data = []
        lines = text_data.split("\n")
        lines.pop()
        validate = URLValidator()

        for line in lines:
            varData = []
            varData.append(line)
            try:
                if line and '://' not in line:
                    line = u'http://%s' % line
                validate(line)
                number_of_images, message = self.countImage(line)
                
                if (message != ""):
                    raise ValidationError(message)


                varData.append(number_of_images)
                varData.append("Link is Valid")

            except ValidationError as e:
                varData.append(0)
                varData.append(str(e))
            
            data.append(varData)
        
        return data #link, conunt, all the links(or error message)
    
    def countImage(self, url):
        count = 0
        try:
            html = urlopen(url)
        except urllib.error.HTTPError as e:
            return count, ('HTTPError = ' + str(e.code))
        except urllib.error.URLError as e:
            return count, ('URLError = ' + str(e.reason))
        except Exception:
            return count, ('generic exception: ' + traceback.format_exc())
        
        soup = BeautifulSoup(html, "html.parser")
        img_tags = soup.find_all('img')
        # links = [img['src'] for img in img_tags]
        count = len(img_tags)
        return count, ""