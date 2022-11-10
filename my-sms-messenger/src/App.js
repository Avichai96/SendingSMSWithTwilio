import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


const apiEndpoint = "http://127.0.0.1:8080/post-message";
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080'

function App() {
  const styles = {
    messagesList: {
      width: '100%',
      maxWidth: 500,
      overflow: 'auto',
      maxHeight: 400,
      '& ul': { padding: 0 }
    },
    listItem : {
      width:400,
      maxWidth: 400,
      height: 120,
      maxHeight: 120,
    },
    nuiListItem : {
      paddingTop: 5,
      border: '1px solid',
      borderRadius: '5px;',
      margin: '5px',
      maxWidth: 390,
      height:80,
      maxHeight: 80,
      overflow: 'scroll',
    },
    left: {
      display: 'inlineBlock',
      float: 'left',
      textAlign: 'right',
      fontSize: '14px',
      lineHeight: '14px',
      position: 'relative',
      top: '3px',
    },
    right: {
      display: 'inlineBlock',
      textAlign: 'left',
      paddingLeft: '160px',
      overflow: 'hidden',
      fontSize: '12px',
      lineHeight: '14px',
      top: '3px',
    }
  };

  const [messagesList, setMessagesList] = useState([]);
  const [messagesContent, setMessagesContent] = useState()
  const [messageIndex, setMessageIndex] = useState(0);
  const messageTextInputRef = useRef(null)
  const PhoneNumberInputRef = useRef(null)
  // useEffect(() => {
  //   async function lol() {
  //     const { data: posts } = await axios.get(apiEndpoint);
  //     setMessagesList(posts);
  //   }
  //   lol();
  // }, []);

  const handlePostMessage = async (messageData) => {
    const obj = {toPhoneNumber: messageData.PhoneNumberInput, messageText: messageData.messageTextInput}
    const { data: post } = await axios.post(apiEndpoint, obj);
    setMessageIndex(messageIndex + 1)
    post["id"] = messageIndex
    console.log(messageIndex, post);
    const posts = [post, ...messagesList];
    setMessagesList(posts);

  };

  const handleSumit = () => {
    const messageData = {
      messageTextInput: messageTextInputRef.current.value,
      PhoneNumberInput: PhoneNumberInputRef.current.value,
    }
    handlePostMessage(messageData)
  }

  const handleClear = () => {
    setMessagesContent("")
  }
  
  return (
    <div className="App">
      <Box component="form" sx={{ "& > :not(style)": { m: 20, width: "100ch" } }}>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <Box bgcolor="#D5E8D1" height={500} width={500}>
              <h1>New Message</h1>
              <Grid container direction="column" justifyContent="space-between" alignItems="center" >
                <TextField inputRef={PhoneNumberInputRef}sx={{ m: 1, width: "40ch" }} id="phoneNumberField" label="Phone nomber" variant="outlined" />
                <TextField inputRef={messageTextInputRef} sx={{ m: 1, width: "40ch" }} id="newMessageFiled" label="New Message" variant="outlined" 
                  multiline rows={4} maxlength="250" onChange={(newValue) => {
                  setMessagesContent(newValue.target.value);
                }} defaultValue={messagesContent} value={messagesContent}/>
              </Grid>
              <Grid direction="row" justifyContent="space-between" alignItems="flex-end" >
                <Button onClick={handleClear} color="secondary">Clear</Button>
                <Button onClick={handleSumit}>Submit</Button>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box bgcolor="#D5E8D1" height={500} width={500}>
              <h1>Message History</h1>
              <Grid container direction="column" >
                <li style={styles.messagesList}>
                  {messagesList.map((message) => (
                    <ul key={message.id} style={styles.listItem }>
                        <Typography style={styles.left}>{message.phoneNumber} </Typography>
                        <Typography style={styles.right}>{new Date().toLocaleString()}</Typography>
                      <ListItem sx={styles.nuiListItem}>
                      <ListItemText secondary={
                          <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                            { message.messageBody }
                          </Typography>
                      }
                      />
                    </ListItem>
                  </ul>
                  ))}
                </li>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
