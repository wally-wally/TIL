from django.db import models

# Create your models here.
class Doctor(models.Model):
    name = models.TextField()

    def __str__(self):
        return f'{self.pk}번 의사 {self.name}'


class Patient(models.Model):
    name = models.TextField()
    # doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE) -- 중개모델이 생겼으므로 이 구문은 필요가 없다.
    doctors = models.ManyToManyField(Doctor, related_name='patients') # Doctor에 넣어도 상관 없음
    # doctors = models.ManyToManyField(Doctor, through='reservation', related_name='patients')

    def __str__(self):
        return f'{self.pk}번 환자 {self.name}'


# class Reservation(models.Model):
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

#     def __str__(self):
#         return f'{self.doctor_id}번 의사의 {self.patient_id}번 환자'