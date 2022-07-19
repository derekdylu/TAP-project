# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# from_email='from_email@example.com',
# to_emails='to@example.com',
# subject='Sending with Twilio SendGrid is Fun',
# html_content='<strong>and easy to do anywhere, even with Python</strong>'

def send_email(from_email, to_emails, subject, html_content):
    message = Mail(
        from_email=from_email,
        to_emails=to_emails,
        subject=subject,
        html_content=html_content)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        # print(response.status_code)
        # print(response.body)
        # print(response.headers)
        return response
    except Exception as e:
        print(e)
