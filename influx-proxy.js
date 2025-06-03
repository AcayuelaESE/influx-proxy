import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.text());

const INFLUX_URL = 'https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/write';
const BUCKET = 'themacsportentateste';
const ORG = '6472d9b639da0ed0';
const TOKEN = 'EF1Mo4cjTYjNEO2A8Z_eQFk6hfetykhxify3DASoLYZxvuzj02dvKwEf-fWm15UFB2NeJcqr3HwWcs9ws4Fsxg==';

app.post('/write', async (req, res) => {
  try {
    const influxRes = await fetch(`${INFLUX_URL}?org=${ORG}&bucket=${BUCKET}&precision=s`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${TOKEN}`,
        'Content-Type': 'text/plain',
      },
      body: req.body,
    });

    const text = await influxRes.text();
    res.status(influxRes.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur proxy vers InfluxDB');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Influx Proxy démarré sur port ${PORT}`);
});
