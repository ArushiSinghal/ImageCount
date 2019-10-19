from rest_framework import serializers
from .validators import validate_file_size, validate_file_extension

class UploadSerializer(serializers.Serializer):
    datafile = serializers.FileField(validators=[validate_file_size, validate_file_extension])