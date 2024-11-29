from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Shoe, Cart, Favorite


# class ShoeSerializer(ModelSerializer):
#     class Meta:
#         model = Shoe
#         fields = "__all__"


class ShoeSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Shoe
        fields = "__all__"

    def get_image(self, obj):
        if obj.image:
            return obj.image.url


class CartSerialzer(ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
        read_only_fields = ["user"]


class FavoriteSerializer(ModelSerializer):
    class Meta:
        model = Favorite
        fields = "__all__"
        read_only_fields = ["user"]
