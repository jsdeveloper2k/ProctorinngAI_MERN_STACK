import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import { Box, Card } from '@mui/material';
import swal from 'sweetalert';

export default function Home({ cheatingLog, updateCheatingLog }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log('AI models loaded.');

    // Start detection loop
    setInterval(() => {
      detect(net);
    }, 1500);
  };

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext('2d');

      let personCount = 0;

      if (obj.length < 1) {
        updateCheatingLog((prevLog) => ({
          ...prevLog,
          noFaceCount: prevLog.noFaceCount + 1,
        }));
        swal('Face Not Visible', 'Action has been recorded', 'error');
      }

      obj.forEach((element) => {
        if (element.class === 'cell phone') {
          updateCheatingLog((prevLog) => ({
            ...prevLog,
            cellPhoneCount: prevLog.cellPhoneCount + 1,
          }));
          swal('Cell Phone Detected', 'Action has been recorded', 'error');
        }
        if (element.class === 'book') {
          updateCheatingLog((prevLog) => ({
            ...prevLog,
            prohibitedObjectCount: prevLog.prohibitedObjectCount + 1,
          }));
          swal('Prohibited Object Detected', 'Action has been recorded', 'error');
        }
        if (element.class === 'person') {
          personCount++;
          if (personCount > 1) {
            updateCheatingLog((prevLog) => ({
              ...prevLog,
              multipleFaceCount: prevLog.multipleFaceCount + 1,
            }));
            swal('Multiple Faces Detected', 'Action has been recorded', 'error');
          }
        }
      });
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <Box>
      <Card variant="outlined">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            height: '100%',
          }}
        />
      </Card>
    </Box>
  );
}
