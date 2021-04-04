# Xpensy

## API documentation
---
### For User Registration

----

# Getting Start 
For the frontend contributer of this (Xpensy-II) project . Follow these steps
1. Clone this Project repo
1. Goto Techedu/frontend folder Then you will see

```bash
    Frontend
    │─── css
    │     │       
    │     └───style.css
    │      
    ├───  js  
    │     │ 
    │     └───main.js
    │     
    │ 
    └──── index.html
    
```

1. Only work on Public Directory

Note: - This read me files chages in time so keep  checking and 


# Routes for developer

## Signup (user registration)

      1. /signup    
        method : 'POST'
        takes : name  , email , password


## Log in

      2. /signin 

        method : 'POST'

        takes : email and password

## Add  expenses

    3. /add
   
        method : 'Post'
        
        takes : authorixation token (in header)

        {title(string), amount(number),date(String)}

##  Get user's All records

      4. /
            method : 'GET'

            takes : auth token in header

## Update record

      5. /update/${id of that record}

            method : 'Patch'

            takes : auth token in header

            {title(string), amount(number),date(String)}

## delete  record

      5. /delete/${id of that record}

            method : 'delete'

            takes : auth token in header

            {title(string), amount(number),date(String)}