DATE := $(shell /bin/date)
site: index.html
	mkdir -p _site
	cp index.html _site/index.html
	cp not_found.html _site/not_found.html
	cp style.css _site/style.css
	mkdir _site/Images
	cp -r Images _site/Images
