import { Button, Card, CardBody, CardFooter, CardHeader, Form , Input } from '@nextui-org/react'
import React , { useState } from 'react'

function Configration() {
  const [streamUrl, setStreamUrl] = useState("");
  const [aIUrl, setAIUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  
  return (
      <Card shadow> 
        <CardHeader>Configration</CardHeader>
        <CardBody>
          <Form >
            <Input required onChange={(e) => setStreamUrl(e.target.value)} label="Stream Url" placeholder="Enter your Stream Url" />
            <Input required onChange={(e) => setAIUrl(e.target.value)} label="AI Url" placeholder="Enter your AI Url" />
            <Input required onChange={(e) => setSecretKey(e.target.value)} label="Secret Key" placeholder="Enter your Secret Key" />
          </Form>
        </CardBody>
        <CardFooter><Button color='primary'>Submit</Button></CardFooter>
      </Card>
      
  )
}

export default Configration
