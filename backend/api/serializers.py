from rest_framework import serializers
from .models import BikeShop,AddtoCart


class BikeShopserializers(serializers.ModelSerializer):
    class Meta:
        model = BikeShop
        fields = "__all__"
        
class AddtoCartserializers(serializers.ModelSerializer):
    class Meta:
        model = AddtoCart
        fields = "__all__"
        
        
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user