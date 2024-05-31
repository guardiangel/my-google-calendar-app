Nest + Google calendar api<br/>

Google Calendar:
1.Create a .env file in the root directory with the content(Get the value from your google cloud console).<br/>
    GOOGLE_CLIENT_ID=<br/>
    GOOGLE_CLIENT_SECRET=<br/>
    GOOGLE_CALLBACK_URI=<br/>
2. Visit the http://localhost:4000/googleauth/google/callback. <br/>

Microsoft Calendar:<br/>
1. Add content in the .env file<br/>
    #Get this from your azure console<br/>
    AZURE_CLIENT_ID=''<br/>
    AZURE_CLIENT_SECRET=''<br/>
    AZURE_TENANT_ID=''<br/>
    AZURE_REDIRECT_URI=http://localhost:4000/outlook/callback #Also configure in the Microsoft Azure portal<br/>
    AZURE_SCOPES=openid profile User.Read Calendars.Read <br/>
2. Visit the http://localhost:4000/outlook/login<br/>