# DevTinder APIs

## AuthRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET   /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId        => interested & ignored
- POST /request/review/:status/:requestId   => accepted   & rejected


## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of  other users on platform

STATUS: ignored, interested, accepted, rejected
