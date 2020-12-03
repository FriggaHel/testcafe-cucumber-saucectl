
DOCKER_IMAGE_NAME := saucelabs/stt-testcafe-cucumber-node

docker:
    docker build -t $(DOCKER_IMAGE_NAME):latest .

all: