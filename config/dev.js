module.exports={
    db:{
       master:process.env.db_url_dev,
        options: {
            useUnifiedTopology: true,
            auto_reconnect: true,
            /*reconnectTries: Number.MAX_SAFE_INTEGER,*/ poolSize: 200,
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            readPreference: "primaryPreferred",
          }
    },
    port:5200,
    appSecret: process.env.app_secret,
    policyType:{
        WC:"WC", 
        GL:"GL", 
        AUTO:"AUTO", 
        PROPERTY:"PROPERTY",
        OTHERS:"OTHERS",
    },
    notificationTypes:{
        VERIFICATION_OTP:"VERIFICATION_OTP"
    },
    occupancyType:{
        'WAREHOUSE':'WAREHOUSE',
        'OFFICE':'OFFICE',
        'RETAIL':'RETAIL',
        'VACANT':'VACANT'
    },
    awsBaseUrl:process.env.awsBaseUrl,
    awsAccessKey:process.env.awsAccessKey,
    awsSecretkey:process.env.awsSecretKey,
    awsBucket:process.env.bucket,
    host:process.env.host,
    user:process.env.user,
    pass:process.env.pass
}