from django.db import models

class Artist(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Music(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    title = models.TextField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return self.content