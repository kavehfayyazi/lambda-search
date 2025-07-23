# lambda-search

AWS Lambda Function URL for semantic search via OpenAI Responses API

## Usage

### Installation

1. Clone the repository:
    
    ```bash
    git clone https://github.com/kavehfayyazi/lambda-search.git
    cd lambda-search
    ```
    
2. Install the dependencies:

    ```bash
    npm install
    ```

3. Upload your code to your Lambda Function's code source by either uploading the files directly or as a compressed .zip file.

4. Create an environment variable in the code source with a key of `OPENAI_API_KEY` and a value of `your-openai-api-key`. 

5. Create an environment variable in the code source with a key of `OPENAI_MODEL` and a value of `your-openai-model`. 

6. Deploy your code.

## API Endpoint

### Create a request

**POST**

- **Body:**
    ```json
    {
        "language": "Your language",
        "library":  "Your library",
        "query":    "Your query"
    }
    ```

The Lambda then sends the following payload to the OpenAI API:
```jsonc
{
    "model": "<OPENAI_MODEL>",
    "input": [
        {"role": "system", "content": "You are a concise programming assistant."},
        {"role": "user", "content": "In <language> using <library>, answer: <query>. Return: relevant functions/classes/modules and a short code example."
        }
    ],
    // Optional: add "temperature": 0.7 to control the randomness
}
```

- **Response**

    You'll receive an OpenAI API response in the format defined [here](https://platform.openai.com/docs/api-reference/responses)

## Project Structure
```
lambda-search/
├── search.js             # Lambda handler, OpenAI API call, and CORS
├── package.json          # Project metadata
└── package-lock.json     # Dependency tree
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Creator: kavehfayyazi
- Email: [kfayyazi@andrew.cmu.edu](mailto:kfayyazi@andrew.cmu.edu)
- Github: [@kavehfayyazi](https://github.com/kavehfayyazi)