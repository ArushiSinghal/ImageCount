from django.test import TestCase, Client
from ..serializers import UploadSerializer
from django.urls import reverse
import json
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
import os
from django.test.client import encode_multipart

# initialize the APIClient app
client = Client()

class UploadFileTest(TestCase):

    def setUp(self):
        self.dir_path = os.path.dirname(os.path.realpath(__file__))
        self.content_type='multipart/form-data; boundary=BoUnDaRyStRiNg'

    def getData(self, fileName):
        upload_file = open(self.dir_path + '/../textfiles/' + fileName, 'rb')
        datafile = SimpleUploadedFile(upload_file.name, upload_file.read())
        data = encode_multipart('BoUnDaRyStRiNg', {'datafile': datafile})
        return data

    def test_valid_upload_file(self):
        data = self.getData('test.txt')
        response = client.post(reverse('url_view'), data=data, content_type=self.content_type)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_empty_upload_file(self):
        data = self.getData('empty.txt')
        response = client.post(reverse('url_view'), data=data, content_type=self.content_type)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_bigger_upload_file(self):
        data = self.getData('SampleTextFile_3MB.txt')
        response = client.post(reverse('url_view'), data=data, content_type=self.content_type)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_different_extension_upload_file(self):
        data = self.getData('mozilla.pdf')
        response = client.post(reverse('url_view'), data=data, content_type=self.content_type)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        

