# Employee-Review-System-Node.js-App

### View this web page at : https://employee-review-system-nodejs.herokuapp.com/

### Introduction
  > Created an application that allows employees to submit feedback toward each other’s performance <br/>
  > Authentication is needed. <br/>

###  How to setup the project on local system

  1.  Clone this project
  2.  Start by installing npm if you don't have it already.
  3.  Navigate to Project Directory by :
  ~~~
  cd Polling-System-API
  ~~~
  4.  run following commands:
  ~~~
  npm install
  nodemon index.js
  ~~~

### Features
  * Admin View
    * Add/remove/update/view employees
    ![](assets/img/adminEmployee.jpg)
    * Add/update/view performance reviews
    ![](assets/img/home.jpg)
    * Assign employees to participate in another employee's performance review
    ![](assets/img/adminSetReviewSetAdmin.jpg)
  * Employee view
    * List of performance review requiring feedback
    * Submit feedback
    ![](assets/img/home.jpg)
  * Login
    ![](assets/img/login.jpg)
  * SignUP
    ![](assets/img/signup.jpg)

### Directory Structure
  `/assets/css` -  all css code<br/>
  `/assets/img` -  all the images <br/>
  `/config` - MongooDB Atlas Configuration <br/>
  `/controllers`  - questions & option controllers code <br/>
  `/model`  - question & option schemas <br/>
  `/routes` - question & option routes <br/>
  `/views` -  all ejs files <br/>
  `index.js`  - entry file <br/>
  
