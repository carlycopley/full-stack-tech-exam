># Full Stack Tech Exam 

**Name:** Carly Copley

## 🔗 Required Links

| Component | Link | 
|-----------|------|
| **GitHub Repository** | https://github.com/carlycopley/full-stack-tech-exam | 
| **GitHub Pages (docs/)** | https://barrycumbie.github.io/full-stack-tech-exam/ | 
| **Dev Server (Render)** | https://full-stack-tech-exam-nejm.onrender.com | 
| **Production Server (GCP)** | http://34.187.193.75 | 
| **Issue** | https://github.com/carlycopley/full-stack-tech-exam/issues/2 | 
| **Pull Request** | https://github.com/carlycopley/full-stack-tech-exam/pull/1 | 
| **Dev Branch** | https://github.com/carlycopley/full-stack-tech-exam/tree/dev | 
| **Successful CI/CD Action** | [https://github.com/carlycopley/full-stack-tech-exam/actions/runs/23021016373/job/66861401191](https://github.com/carlycopley/full-stack-tech-exam/actions/runs/23022340812) | 
| **ssh cmd to your gcp** | `ssh -i ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDkJLauc1AmvJVRFWfen7sCAE1vtLCyG26HoJi1FL2Y0 ccopley1@CSM245-LAB21`
 bcumbie@34.187.193.75` | 

---

# Full Stack Tech Exam Instructions

>Starting with a given codebase (provided as a GitHub repository), 
>configure and develop a full stack infrastructure and app. 

## Requirements 
> for the sake of time, you may can approach these steps in the order you choose. 

### 1️⃣ access the codebase
- using the [stater code base repository](https://github.com/barrycumbie/full-stack-tech-exam)
- bring the code into your own repository via `fork` `import` or `copy/paste`

### 2️⃣ configure your repository
- set up a GitHub Pages deployment pointing to `docs/`
- include the link in the `About`
- ensure the GitHub Pages shows your `README` 
  
### 3️⃣ modify the codebase
- take the steps to get the `Node.js` app working (suggest locally)
- an endpoint to serve front end html via a `public/` directory
- `public` is organized with no internal `scripts` or `styles` (use directories)
- an `input` to submit a user name
- a `dom` element to receive a response from the server
- upgrade the front end with `html` & `styles` to guide a user what is going on
- for the server `app.mjs` ensure the correct packages are installed, imported, & available
- refactor the front end `html` from a `<form>` to use the `js fetch()`
- environmental variables with a provided `mongodb` connection string 
- endpoints (middlewares)
	- input an emoji for a given username (no front end required, see code comments)
	- serve a static `html` from `public/` (`get to slash`)
	- receive user input & return a response
- include in the `README` links to your production server `http://static.external.gcp.ip`

### 4️⃣ set up a `dev` server
- create a `dev` branch & a dev server
- include the link in your `README`

### 5️⃣ set up a `gcp` `compute engine` `vm instance`
- config = firewall `http` & `https`, `static external ip` & requisite `ssh` public keys (including the `student-key.pub`)

`student-key.pub # available on canvas`

- `ssh` into the the vm `instance` 
- update the `OS` & install the needed packages
- initialize your repository (`git clone` in proper directory)
- set up your `nginx` `reverse-proxy`
- (test your app using a `node` cmd)
- run your app with a production-grade process manager 
- getting app errors, try `pm2 loggs -n 50`

###  6️⃣ set up `ci/cd` on the `main` branch
- use a `.github/workflows/` `.yaml` file
- ensure use of `Git Hub action` `env` `secrets` & `variables`
- create a milestone called `full stack tech exam`
- test `ci/cd` with an `issue` & `pull request` 
	- ensure the two are linked
	- assign both the issue and pull request to the `full stack tech exam` milestone
	- assign both to yourself 
- include described links on your `readme` to 
	- the `issue`, `pull request`, `milestone` & successful `action`

## Submission
- a link to your repository. 
