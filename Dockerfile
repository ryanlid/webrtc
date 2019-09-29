FROM node:lts

WORKDIR /app

COPY . /app

RUN ls -all \
  && node -v \
  && npm -v \
  && npm install --production

EXPOSE 3000

CMD ["npm" ,"run", "start"]
