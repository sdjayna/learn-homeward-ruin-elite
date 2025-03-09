#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

echo -e "${YELLOW}Deploying to Cloudflare Pages...${NC}"
# Use --commit-dirty=true to avoid warnings about uncommitted changes
# Use --no-bundle to ensure we're not using Workers
npx wrangler pages deploy dist/learn-homeward-ruin-elite/browser \
  --project-name=learn-homeward-ruin-elite \
  --commit-dirty=true \
  --no-bundle

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${YELLOW}Getting deployment URL...${NC}"

# Get the deployment URL from the output
DEPLOYMENT_URL=$(npx wrangler pages deployment list --project-name=learn-homeward-ruin-elite | grep -m 1 "https://" | awk '{print $2}')

if [ -n "$DEPLOYMENT_URL" ]; then
  echo -e "${GREEN}Your site is deployed at: ${YELLOW}$DEPLOYMENT_URL${NC}"
  echo -e "${YELLOW}Opening in browser...${NC}"
  open "$DEPLOYMENT_URL"
else
  echo -e "${RED}Could not determine deployment URL.${NC}"
  echo -e "${YELLOW}Check your deployments with:${NC}"
  echo -e "npx wrangler pages deployment list --project-name=learn-homeward-ruin-elite"
fi
