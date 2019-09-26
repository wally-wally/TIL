from django.db import models
from django.urls import reverse

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('-pk',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("articles:detail", kwargs={"article_pk": self.pk})


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-pk',)

    def __str__(self):
        return self.content