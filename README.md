# SEManagement_project2
Docker compose and using Volumes

Randy Quimby and Brittany Lane

IPv4 Public IP: 18.223.169.23
IPv4 Private IP: 172.31.35.64

POST instructions for calling the '/purchase' route:

In postman, choose POST and type in the '/purchase' route ('localhost:80/purchase' if running locally, '18.223.169.23/purchase' if running off the ec2 instance).  Select the Body tab under the URL and enter 'item' as a key with whatever value you desire in the value column (IE Hotdog, Hamburger, Soda, Cookie).  Enter 'quantity' as a second key with whatever numeric value you wish in the value column (non-numeric values will return an error page prompting you to return to /getmenu to try again).  

You could also perform the same as above in any browser.  Simply go to the /getmenu route and fill out the form fields (dropdown and text entry) and click 'submit'.
