# SEManagement_project2
Randy Quimby and Brittany Lane

How the work was split: 
Randy completed the fake ordering service and made the changes to the original ordering service.  Brittany completed the fake inventory service.  Both Randy and Brittany completed the .yml file and Dockerfiles.

To start the Fake Ordering Service, call the route 'localhost:3002/start' (or 18.223.169.23:8080/start).
The start route '/start' begins the test harness.

To use the /setcount route, create a POST in postman with 'item' and 'quantity' in the body.  Use the URL '18.223.169.23:8089/setcount' (or localhost:3003/setcount).  If the quantity is set to 0, then the program will report back "Out of Stock!".

IPv4 Public IP: 18.223.169.23 IPv4 Private IP: 172.31.35.64
