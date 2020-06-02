
deploy-staging:
	yarn build --mode staging
	netlify deploy --dir=dist --prod --site=3de2a9b2-9579-4507-b5d5-b34ded186b22

deploy-prod:
	yarn build --mode prod
	netlify deploy --dir=dist --prod --site=6c375104-1668-44a3-9031-9a8dbdfd6bbf

deploy: deploy-staging deploy-prod

serve:
	yarn serve
