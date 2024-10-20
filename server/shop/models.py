from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError

GENDER_CHOICES = [
    ("M", "Male"),
    ("F", "Female"),
    ("U", "Unisex"),
]

TYPE_CHOICES = [
    ("Running", "Running"),
    ("Basketball", "Basketball"),
    ("Skateboarding", "Skateboarding"),
    ("Training", "Training"),
    ("Football", "Football"),
    ("Lifestyle", "Lifestyle"),
]

BRAND_CHOICES = [
    ("Nike", "Nike"),
    ("Adidas", "Adidas"),
    ("Puma", "Puma"),
    ("Skechers", "Skechers"),
    ("Crocs", "Crocs"),
    ("SinPauk", "SinPauk"),
    ("Timberland", "Timberland"),
]

COLOR_CHOICES = [
    ("Black", "Black"),
    ("White", "White"),
    ("Red", "Red"),
    ("Green", "Green"),
    ("Blue", "Blue"),
    ("Gray", "Gray"),
    ("Brown", "Brown"),
    ("Silver", "Silver"),
    ("Gold", "Gold"),
    ("Pink", "Pink"),
    ("Orange", "Orange"),
    ("Cyan", "Cyan"),
    ("Yellow", "Yellow"),
]

MAX_IMAGE_SIZE = 1 * 1024 * 1024  # 1MB in Bytes


class Shoe(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=40, choices=BRAND_CHOICES)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES)
    price = models.FloatField()
    stock = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    image = models.ImageField(upload_to="shoe_images/", blank=False)

    # Image size validation
    def clean(self):
        if self.image and self.image.size > MAX_IMAGE_SIZE:
            raise ValidationError(f"Image file size should not exceed 1 MB")

    def __str__(self):
        return f"{self.name} - {self.get_brand_display()}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shoe = models.ForeignKey(Shoe, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )

    def __str__(self):
        return f"Cart({self.user.username}, {self.shoe.name}, {self.quantity})"

    class Meta:
        unique_together = ("user", "shoe")


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shoe = models.ForeignKey(Shoe, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "shoe")
