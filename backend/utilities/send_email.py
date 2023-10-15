# I can send anyone emails using Python. The following code is enough for sending a mail with a text message and a subject.
# this will only work on my Laptop, coz the Env variable is only stored here.

import smtplib
from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# getting the login and password from the environment variables on this pc

EMAIL_ADDRESS = "puzzlelists@gmail.com"
with open("private/email_pass.txt", "r") as f:
    EMAIL_PASSWORD = f.read()


def send_reset_mail( To, Subject= "Reset Password Link", link = "" ):
    """
    :param To: The person's *Gmail* id that you are trying to send to.
    :param Subject: The subject of your mail
    :param Content: What it is that you want to send
    :return: 0 if failed or error encountered, 1 if successfully sent
    """

    if "@gmail.com" not in To or type(Subject) != str or type(link) != str:
        print(
            "Either the email address is not a gmail address, or the content and Subject is not a String"
        )
        return 0

    # declaring a message instance
    msg = EmailMessage()
    msg["Subject"] = Subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = To
    content = f"We get it, Stuff Happens. Here is a link to reset your password. \n\n{link}\n\nRegards\nThere All Along\nKrishnaraj"
    msg.set_content(content)

    # sending the email, by creating an SMTP_SSL instance
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return 1
    except:
        return 0

def send_verification_mail( To, Subject= "Verify Your Email with There All Along", link = "" ):
    """
    :param To: The person's *Gmail* id that you are trying to send to.
    :param Subject: The subject of your mail
    :param Content: What it is that you want to send
    :return: 0 if failed or error encountered, 1 if successfully sent
    """
    
    if "@gmail.com" not in To or type(Subject) != str or type(link) != str:
        print(
                "Either the email address is not a gmail address, or the content and Subject is not a String"
        )
        return 0
    
    # declaring a message instance
    msg = EmailMessage()
    msg["Subject"] = Subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = To
    content = f"Thank You for your interest in our App!\nPlease Click on the Following Link to Verify your email! \n\n{link}\n\nRegards\nThere All " \
              f"Along\nKrishnaraj"
    msg.set_content(content)
    
    # sending the email, by creating an SMTP_SSL instance
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return 1
    except:
        return 0

def send_csv_file_of_form_data(To, Subject, csv_content):
    EMAIL_ADDRESS = "puzzlelists@gmail.com"  # Replace with your Gmail address
    
    # Create a message instance
    msg = MIMEMultipart()
    msg["Subject"] = Subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = To
    
    # # Add plain text content to the email
    # content = f"Here is the CSV File of the Form Data that you requested. \n\nRegards\nThere All Along\nKrishnaraj"
    # msg.attach(MIMEText(content, 'plain'))
    
    # Attach the CSV content as a CSV file
    csv_attachment = MIMEText(csv_content, 'csv')
    csv_attachment.add_header('Content-Disposition', 'attachment', filename="data.csv")
    msg.attach(csv_attachment)
    
    # Sending the email by creating an SMTP_SSL instance
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return 1
    except:
        return 0
