# I can send anyone emails using Python. The following code is enough for sending a mail with a text message and a subject.
# this will only work on my Laptop, coz the Env variable is only stored here.

import os
import smtplib
from email.message import EmailMessage

# getting the login and password from the environment variables on this pc

EMAIL_ADDRESS = "puzzlelists@gmail.com"
with open("../private/email_pass.txt", "r") as f:
    EMAIL_PASSWORD = f.read()


def send_mail(To, Subject="Reset Password Link", Content="Regards, There All Along"):
    """
    :param To: The person's *Gmail* id that you are trying to send to.
    :param Subject: The subject of your mail
    :param Content: What it is that you want to send
    :return: 0 if failed or error encountered, 1 if successfully sent
    """

    if "@gmail.com" not in To or type(Subject) != str or type(Content) != str:
        print(
            "Either the email address is not a gmail address, or the content and Subject is not a String"
        )
        return 0

    # declaring a message instance
    msg = EmailMessage()
    msg["Subject"] = Subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = To
    msg.set_content(Content)

    # sending the email, by creating an SMTP_SSL instance
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return 1
    except:
        return 0
