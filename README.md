# CDM Nexus Web App

An online web application that features a learning platform where students can access math-focused lecture materials, worked examples, and short quizzes, on-demand.

The web app also includes the option for students to apply for a face-to-face tutoring session with the CDM Nexus tutors (depending on the availability of the program).

## Prerequisites

- Download and install [Visual Studio Code](https://code.visualstudio.com/download).

- Download and install [Powershell 7](https://github.com/PowerShell/PowerShell/releases/download/v7.5.0/PowerShell-7.5.0-win-x64.msi).

  - On Windows Terminal, set as 'Powershell 7' as Default Profile

- Download and install Windows Subsystem for Linux by running the following command:

  ```powershell
  wsl --install -d Ubuntu
  ```

  - Check if it was installed properly by running:

  ```powershell
  wsl --status
  ```

- Open Visual Studio Code and install the [WSL Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) by Microsoft.

## Setup in Linux Environment

- Routine command every time you open your Linux environment:

  ```bash
  sudo apt -y update && sudo apt -y upgrade && sudo apt -y autoremove
  ```

- Check if git is installed by running

  ```bash
  git --version
  ```

  - If it doesn't display a version number, install git by running:

    ```bash
    sudo apt install git
    ```

- Install the GitHub CLI by running:

  ```bash
  sudo apt install gh
  ```

  - Check if it was installed properly by running:

    ```bash
    gh --version
    ```

- Install Node.JS by running the following commands:

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  nvm install 23
  ```

  - Check their versions by running the following:

    ```bash
    node -v # Should print "v23.7.0".
    nvm current # Should print "v23.7.0".
    npm -v # Should print "10.9.2".
    ```

- Create a directory for your projects.

  ```bash
  mkdir folder-name
  ```

- Move into the directory you created.

  ```bash
  cd folder-name
  ```

- Clone this repository by running:

  ```bash
  gh repo clone yoitsmedarls/CDM-Nexus
  ```

- Run the command below. You should see a folder named 'CDM-Nexus' in the current directory.

  ```bash
  ls
  ```

- Open the folder in Visual Studio Code by running:

  ```bash
  code CDM-Nexus/
  ```

- A Visual Studio Code window should pop up. Now, install the necessary dependencies by running:

  ```bash
  npm install
  ```

- The website project should now be locally accessible. Try running the following command and open the localhost URL in a browser.

  ```bash
  npm run dev
  ```

## Recommended Visual Studio Code Extensions

Install the following extensions to improve functionality of Visual Studio Code for this specific project.

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)
- [HTML End Tag Labels](https://marketplace.visualstudio.com/items?itemName=anteprimorac.html-end-tag-labels)
- [JavaScript Booster](https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster)
- [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv)
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Developers

- Don Diego, Michaella C. ([@linktogithub](https://www.github.com/linktogithub))
- Laydia, John Emmanuel A. ([@linktogithub](https://www.github.com/linktogithub))
- Minlay, Louise Antoinette V. ([@linktogithub](https://www.github.com/linktogithub))
- Ugaban, John Daryl J. ([@yoitsmedarls](https://www.github.com/yoitsmedarls))
