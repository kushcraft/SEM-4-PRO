from django.db import models
from django.core.validators import RegexValidator
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    enrollment_number = models.CharField(max_length=14,
            unique=True,
            validators=[
            RegexValidator(
                regex=r'^\d{14}$',
                message='Enrollment number must be exactly 14 digits.',
                code='invalid_enrollment_number'
            )
        ])
    branch = models.CharField(max_length=100)
    
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=10,
            validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message='Mobile number must be exactly 10 digits.',
                code='invalid_mobile_number'
            )
        ])
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name
