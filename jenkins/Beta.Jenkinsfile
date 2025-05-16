pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                dir('one-n') {
                    sh 'npm install'
                }
            }
        }

        stage('Copy config') {
            steps {
                dir('one-n') {
                    sh 'find /app/config/n1/front -type f -exec cp {} . \;'
                }
            }
        }

        stage('Build') {
            steps {
                dir('one-n') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('one-n/build') {
                    sh 'cp -r ./* /app/src/web/n1-beta'
                }
            }
        }
    }
}
