# Scaff-js

This package is used for scaffolding Node.js applications, with basic packages such as express and nodemon.

### Installation

The package is installed as a global package using the command  
`npm i -g scaff-js`

## Usage

Scaff-js can then be used in any directory in the bash script to scaffold a project, using the prefix **sf**, i.e. `sf <command> <options>`

### Commands

> Generate new application

`sf new` <_app-name_>` `<_options_>` `

### Options

-   **Version**

    `-v` | `--version` <_version_>  
    This specifies the app version. Default is _1.0.0_

-   **Description**  
    `-d` | `--description` <_description_>  
    App description

-   **Web framework** <_framework_>  
    `-wf` | `--web-framework` <framework>  
    Web framework to be used, either express or netlify. Default is "express"

-   **Server**  
    `-s` | `--server` <_server-name_>  
    Server name to be used. Default is `index.js`

-   **Port**
    `-p` | `--port` <_port_>  
     Port number the app runs on. Default is 3000

-   **Nodemon** (boolean)
    `-nm` | `--nodemon`  
    Specify whether or not to use nodemon as a dev dependency. Default is `false`. If the flag is included, value will be `true`

-   **Author**
    `-a` | `--author` <_author_>  
    Name of the author of the project

-   **GitHub Repo** (URL)  
    `-gh` | `--github` <_github-repo_-url>  
    Project's github URL

-   **Licence**  
    `-lc` | `--license` <_license_>  
    Licence used. Default is ISC

-   **Help**  
    `-h` | `--help`  
    Display help for command options
