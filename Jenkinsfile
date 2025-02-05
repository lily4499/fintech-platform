pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "laly9999"
        IMAGE_NAME = "fintech-backend"
        IMAGE_TAG = "v2.0"
        GIT_REPO = "https://github.com/lily4499/fintech-platform.git"
    }

    stages {
        stage('Checkout Code') {
            steps {
                 git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Build Docker Image') {
            steps {
                 sh "docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG ./backend"
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    sh "docker push $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG"
                }
            }
        }

        stage('Update Kubernetes Manifest') {
            steps {
                sh '''
                git clone $GIT_REPO
                cd fintech-platform/k8s-manifests
                sed -i 's|image:.*|image: '$DOCKERHUB_USER'/'$IMAGE_NAME':$IMAGE_TAG|' base/backend-deployment.yaml
                git config user.name "lily4499"
                git config user.email "konissil@gmail.com"
                git commit -am "Updated backend image to new version"
                git push origin main
                '''
            }
        }
    }
}
