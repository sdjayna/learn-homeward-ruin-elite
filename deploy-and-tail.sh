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
npx wrangler pages deploy dist/learn-homeward-ruin-elite/browser --project-name=learn-homeward-ruin-elite

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${YELLOW}Tailing logs...${NC}"
npx wrangler pages deployment tail --project-name=learn-homeward-ruin-elite
