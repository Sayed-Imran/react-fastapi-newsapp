from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
# from newsapi import NewsApiClient

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# newsapi = NewsApiClient(api_key='c5c67d04c2b04d97970b376930f84180')

@app.get("/", status_code=status.HTTP_200_OK)
def getNews(country,category,page,pageSize):
    # all_articles = newsapi.get_top_headlines(country=country,category=category,page=page,page_size=pageSize)
    data = requests.get(f"https://newsapi.org/v2/top-headlines?country={country}&category={category}&apiKey=c5c67d04c2b04d97970b376930f84180&page={page}&pageSize={pageSize}").text
    print("DATA:",data)
    # print("ARTICLES:",all_articles)
    return json.loads(data)
    # return all_articles