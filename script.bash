#!/bin/bash
host=https://opinionpedia.net

send_request() {
    local method="$1"
    local path="$2"
    local body="$3"

    curl -D - -sS -X $method \
	    -H 'Content-Type: application/json' \
	    -d "$body" $host$path
	    echo
}

send_request POST /api/profile '{
	"username": "annoymous",
	"password": "ThomasPaulThirddAlexander",
	"description": null,
	"body": null
}'

send_request POST /api/login '{
	"username": "annoymous",
	"password": "ThomasPaulThirddAlexander"
}'

echo 'Your authentication token should be displayed (twice), please save it	'
