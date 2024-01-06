## Prerequisites

Before running the project, make sure you have the following software installed on your machine:

- Node.js v18: You can use NVM (Node Version Manager) to install Node.js v18.
  

## Installation

### Installing Node.js v18 using NVM

1. Install NVM (Node Version Manager) by following the instructions at [NVM repository](https://github.com/nvm-sh/nvm#installation). Choose the installation method that is suitable for your operating system.

2. Once NVM is installed, open a new terminal window or restart your terminal.

3. Install Node.js v18 by running the following command:

   ```bash
   nvm install 18
   ```

4. Verify that Node.js v18 is installed by running the following command:

   ```bash
   node --version
   ```

   You should see the version number of Node.js v18.

### Starting the APPLICATION

1. Install project dependencies by navigating to the project directory in your terminal and running the following command:

   ```bash
   npm install
   ```

2. To start the application run `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Loom Video
Video: https://www.loom.com/share/c4ab952538584ad88043913b3b60a3c1


### Task 2: Offline-First Strategy Considerations
Considering you have an intricate backend with numerous functionalities 
and a frontend that currently interfaces with the backend using GraphQL, 
please address the following points:

**Question 1. Outline the initial steps you would take to transition the frontend/backend to support an offline-first approach.**
<br/>Answer: 
To support an offline-first approach. 
Firstly I will focus on data synchronization. For data synchronization, Firstly I will check what is the critical data that we need support in offline mode. secondly, implement a data synchronization mechanism in both frontend and backend. So that when a user goes online. we can sync the data in between. we can have this feature in rxDB

Authentication is also a main part of accessing data. So I will make sure that the authentication mechanism is implemented when the user is offline. After that, I will also look into caching data to optimize the use of locally stored data.


**Question 2. Drawing from your own experience with offline functionalities, what challenges have you encountered when maintaining offline modes?**
<br/>Answer: 
The following are the challenges I have overcome while implementing offline functionalities. 
1. There are times when the same data is updated both online and offline causing conflicts.
2. Local storage capacity is limited affecting the data stored.
3. Cross-browser compatibility is one of the major issues that I have faced.
4. Background syncing failure has caused major data loss

**Question 3. How did you overcome these challenges, or what solutions did you implement?**
<br/>Answer: 
Based on the answer to question 2. I have listed down the details of how I overcame the challenges.

1. For conflicts I have introduced versioning and also worked on simplifying the data.
2. For this I have prioritized the data that needs to be stored offline.
3. For this I have to implement feature detection and then provide fallback mechanisms for unsupported browsers. Also whenever testing is done I have to test on multiple browsers to ensure everything is working fine.
4. To deal with background syncing failure. I have added notifications and job details for users. So the user can retry to keep synced

**Question 4. Are there any particular tools, libraries, or practices you've found especially helpful or problematic in this context?**
<br/>Answer: 
I have listed down some of the tools/libraries that I have found to be helpful in this context.

1. Apollo Client with Apollo Link State
   - Helpful for graphql state management
2. Service Workers (Workbox)
   - Helpful: Service workers are helpful for caching purposes
   - Problem; Service workers can have cross-browser compatibility issues.
3. IndexedDB (Dexie.js)
4. Redux Offline
   - This library provides offline support. It allows actions to be queued and executed when the device gets online.
5. PouchDB/CouchDB
   - It's a JS library that syncs with couch db.
   - Implementation of pouch db with couch db is complex.



**Question 5. Are there any emerging technologies or trends that might influence how we think about offline experiences?**
<br/>Answer: 
Yes, there are some emerging technologies that I have followed and can influence our offline experience.

1. Offline-First Frameworks -> Offline-first development is emerging, providing developers with tools and patterns to prioritize offline functionality. This can streamline offline development
2. GraphQL Subscriptions -> It provides real-time data updation to keep users up to date.
3. Progressive Web Apps(PWAs) -> PWAs uses service workers to cache resources. Their offline support is increasing their popularity.
4. Web Assembly -> Web assembly uses c and c# to write high-performance code that can be run directly in browsers. So it can provide better support for offline computation. 

