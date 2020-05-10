default: buildapp

yarn-install:
ifeq (${NODE_ENV},production)
	# Workaround for buggy vue-webpack build
	yarn install --production=false
else
	yarn install
endif

yarn-build:
	VUE_APP_VERSION="`cat version.txt`" VUE_APP_BUILD_VERSION="${VUE_APP_BUILD_VERSION}" yarn run build
	cp version.txt dist/version.txt

yarn-clean:
	yarn cache clean

version:
	git describe --tags > version.txt
	sed -e 's/$$/${VERSION_SUFFIX}/' -i version.txt
	cat version.txt

serve:
	yarn serve

buildapp: version yarn-install yarn-build yarn-clean
