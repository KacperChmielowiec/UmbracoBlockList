# OskiStarterKit

## Installation

Follow these steps to install and configure the package:

### Step 1: Open the Command Prompt

Launch the Command Prompt application on your computer to prepare for the installation process.

### Step 2: Execute the installation command

Copy and paste the following command into the Command Prompt window to install all necessary components:

```
dotnet new install Umbraco.Templates && dotnet new umbraco -n YourProjectName --friendly-name "Administrator" --email "admin@example.com" --password "1234567890" --connection-string "server=YourServerName;database=YourDBName;trusted_connection=true" && cd YourProjectName && dotnet add package OskiStarterKit && dotnet build && dotnet run
```

In this command, you can specify your Umbraco's backoffice credentials, your connection string, and your project name.

### Step 3: Configure SMTP settings
After you have started the project, you can navigate to the "Settings" section. There you will find the "SMTP Configuration" tab. You will see default values for SMTP configuration.

In this section, you can configure your SMTP settings and submit them, using the "Submit" button.

### Step 4: Configure error page settings
Locate the appsettings.json file and look for the "Content" section. Here, you will find the settings for the Error page:

```
"Error404Collection": [
  {
    "Culture": "default",
    "ContentKey": "c079090c-b1e9-463b-aad3-f0b11b9aae54"
  }
]
```

### Step 5: Register the custom error page middleware

Add the following using directive at the top of your Startup.cs file:

using OskiStarterKit;

Inside the Configure method of your `Startup.cs` file, add the following line to register the custom error page middleware:

```
app.UseCustomErrorPage();
```

### Step 6: Enjoy using our solution!
