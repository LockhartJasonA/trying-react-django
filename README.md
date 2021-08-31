# django project
- Follow the steps below in order

## Start Database
- docker-compose up -d

## Start Backend
I did have trouble testing on different versions of python. If that's the case feel free to pip 
install the items in requirements.txt individually per your setup requirements.

- cd server
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver 

## Start Frontend
tested and run on Node@14 (14.17.3 & 14.17.6)

- (for mac brew install Node@14)
- cd client
- yarn install && yarn start
