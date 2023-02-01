import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

const { Configuration, OpenAIApi } = require("openai");

function Home() {
    const [buttonText, setButtonText] = useState("Submit");
    

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    async function handleSubmit(event) {
        setButtonText(<Spinner animation="border" />);
        event.preventDefault();
        let code = event.target[0].value;
        const response = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: "##### Rewrite this code such that the logic remains the same but the code looks completely different\n### Orignal\ndef sum(a,b):\n    return a + b\n### Changed Code\nsum = lambda a, b: a + b\n### Orignal\ndef sum(a,b):\n    return a + b\n### Changed Code\ndef add(num1,num2):\n    total=num1+num2\n    return total\n### Orignal\ndef sum(a,b):\n    return a + b\n### Changed Code\nprint(a+b)\n### Orignal\nfor i in range(1, 11):\n    print(i)\n### Changed Code\ni = 1\nwhile(i<=10):\n    print(i)\n    i += 1\n### Orignal\nstart, end = 1, 100\nfor num in range(start, end + 1):\n    if num % 2 == 0:\n        print(num)\n### Changed Code\nmax = 100\nfor i in range(2, max+1, 2):\n    print(i)\n### Orignal\ndef Fibonacci(n): \n    a = 0\n    b = 1\n    if n < 0: \n        print(\"Incorrect input\") \n    elif n == 0: \n        return a \n    elif n == 1: \n        return b \n    else: \n        for i in range(2,n+1): \n            c = a + b \n            a = b \n            b = c  \n        return b\n### Changed Code\ndef fib(n): \n    if n<0: \n        print(\"Incorrect input\") \n    # First Fibonacci number is 0 \n    elif n==1: \n        return 0\n    # Second Fibonacci number is 1 \n    elif n==2: \n        return 1\n    else: \n        return fib(n-1)+fib(n-2)\n### Orignal\nlst = [10, 11, 12, 13, 14, 15]\nlst.reverse()\n### Changed Code\nlst = [10, 11, 12, 13, 14, 15]\nprint(lst[::-1])\n### Orignal\nl = [1, 2, 4, 2, 1, 4, 5]\nprint(\"Original List: \", l)\nres = [*set(l)]\nprint(\"List after removing duplicate elements: \", res)\n### Changed Code\nl = [1, 2, 4, 2, 1, 4, 5]\nprint(\"Original List: \", l)\nres = [] \nfor i in l: \n    if i not in res: \n        res.append(i) \nprint(\"List after removing duplicate elements: \", res)\n### Orignal\n" + code + "\n### Changed Code",
            temperature: 0.5,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0.45,
            presence_penalty: 1,
            stop: ["###"],
        });
        console.log(response.data.choices[0].text);
        document.getElementById("modified").value = response.data.choices[0].text;
        setButtonText("Submit");
    }

    return (
        <Container fluid="md" className='cont'>
            <Container>
                <Row>
                    <Col fluid>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Enter Code:</Form.Label>
                                <Form.Control as="textarea" rows="10" type="text" placeholder="Code" />
                            </Form.Group>
                            <Button variant="primary" type="submit" id="submit">
                                {buttonText}
                            </Button>
                        </Form>
                    </Col>
                    <Col fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Modified Code:</Form.Label>
                                <Form.Control id="modified" as="textarea" rows="10" disabled type="text" placeholder="Code" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Home;