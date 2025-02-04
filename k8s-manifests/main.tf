terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}
provider "aws" {
  region = "us-east-1"
}
module "eks_cluster" {
  source = "lily4499/eks-dvpc/aws//my_eks"
  version = ">= 1.0.0, < 2.0.0"
  cluster_name  = "fintech-eks"
  eks_version   = "1.26"
  ami_type      = "AL2_x86_64"
  instance_types = ["t3.small", "t3.medium", "t3.large"]
  subnet_ids     = ["subnet-062bafb72ff1b9c71", "subnet-00f1308ab05d4d97a"]
}
