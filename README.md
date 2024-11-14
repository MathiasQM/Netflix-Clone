# PriceShape Recruitment Project

Welcome to the **PriceShape Recruitment Project** repository! This project demonstrates my motivation and proficiency with **React**, **MongoDB**, and **TypeScript**. The project was created as part of the recruitment process to showcase my skills to the PriceShape team. Please note that this is a demonstration project, so some features are incomplete, and areas may lack full styling or optimizations.

## Project Overview

The purpose of this project is to provide a sample application where users can:
- **Sign Up** and **Log In**
- **Browse Movies** from the default `sample_mflix` MongoDB Atlas database
- **Save Movies to "My List"**, where users can keep track of their favorites

While the main functionality is complete, I didn’t focus heavily on **TailwindCSS** for styling, and I didn’t implement tests due to time constraints. This project is built using the `sample_mflix` database included in MongoDB Atlas.

## Key Concepts Demonstrated

1. **Authentication**: Users can sign up and log in to access their personal list of movies.
2. **Movie Browsing**: Users can browse a selection of movies and choose which ones to save to their list.
3. **One-to-Many Relationship**: To demonstrate data modeling, I created a `My List` collection, where each saved movie is stored with a reference to the user who saved it. This represents a **one-to-many relationship**:
   - Since each user may have an infinite number of saved movies, saved movies are **not embedded directly on the user document**. Instead, each saved movie document contains a reference to the user who saved it.
   - This approach helps avoid issues with MongoDB's document size limit and keeps the data structure flexible.
  
4. **Schema**:
   - There is no particular schema, as this flexibility is one og the things I love about MongoDB, but I've tried sticking to a cirtain structure to avoid messy data.
   - I have also demonstrated the use of **projection** and the **aggregation** framework to optimize datafetching and limit the amount of data that is sent over the wire.


5. **Considerations for Scalability**:
   - This approach does have potential inefficiencies, especially if the user base grows infinitely. A more scalable solution would involve **sharding** the `My List` collection by `userId`. However, due to the small scale of this project and my limited experience with sharding, I have opted not to implement this.

## Technologies Used

- **React**: Frontend framework for building interactive UIs.
- **MongoDB**: NoSQL database used to store user data, movies, and saved lists.
- **TypeScript**: Adds static typing to JavaScript, helping improve code quality and reliability.
- **TailwindCSS**: Basic styling, although not heavily focused in this demo.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/priceshape-recruitment-project.git
   cd priceshape-recruitment-project
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
   
3. **Create your enviroment variables**:
MONGODB_URI=<your-mongodb-uri>
JSON_WEB_TOKEN_SECRET=<your-jwt-secret>

4. **Run the project**:
   ```bash
   npm run dev
   ```

5. **Ensure you have the sample_mflix database in MongoDB Atlas. This project uses the sample data provided by MongoDB.**:
