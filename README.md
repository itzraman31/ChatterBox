--->>> For frontend
# move to frontend folder
cd Frontend

# install all dependencies.
npm i --force

# start the frontend
npm start

--->>> For backend

# now move to backend folder through another terminal in same folder
cd Backend

# install all dependencies.
npm i --force

# create a .env file in backend folder and add below configs.

<<<< -----  .env config starts here   ---->>>>

mongodb=<<-- Your mongodb uri -->>

# JWT Signature
sign=<<-- Your JsonwebToken secret_signature -->>

port=<<-- port -->>

# Cloudinary configs
cloud_name=<<-- Your cloudinary name -->>
api_key=<<-- Your cloudinary api_key -->>
api_secret=<<-- Your cloudinary api_secret -->>

<<<< -----  .env config endups here   ---->>>>

# start the backend server
npm start
