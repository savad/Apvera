# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    address = models.TextField(null=False, blank=False)
    phone_number = models.CharField(max_length=30, null=False, blank=False)

    def __unicode__(self):
        if self.first_name == '':
            return self.username
        else:
            return u'%s %s' % (self.first_name, self.last_name)

    REQUIRED_FIELDS = ['first_name', 'email', 'address', 'phone_number']