# Project Glossary

* **Account** - See "Social Identity"
* **Announcement** - A item of data, typically an image or note, either directly posted or hashed then posted to the blockchain
* **Announcer** - The account, typically a user, who posts an announcement
* **Bad actor** - A user intentionally using the application for evil or illegal purposes
* **Bot** - A non-living, automated account, sometimes malicious but often providing some service ("Hey Alexa, what's the weather?")
* **Consumer** - Someone who reads content from social media
* **Contract address** - The unique number associated with a smart contract posted on the blockchain
* **Dead drop** - A pre-selected virtual location to leave an encrypted message without giving away the identity of the receiver, see [Dead Drops](https://github.com/Liberty30/admin/wiki/Dead-Drops)
* **Happy path** - The expected user flow assuming no errors or bad actors
* **Hash** - A string of characters generated from a hash function, see "Hash function"
* **Hash function** - A cryptographic function whose output is effectively unique for any given input without any information from the input being accessible in the output
* **Hash Collision** - The absurdly unlikely possibility of a hash providing the same output for two different inputs
* **Private key** - The key from a public-private key pair intended to be kept secret, see "Public-Private Key Pair"
* **Producer** - Someone who creates content on a social media
* **Prosumer** - Someone who is both a producer and a consumer, see "Consumer" and "Producer"
* **Public key** - The key from a public-private key pair intended for sharing publicly, see "Public-Private Key Pair"
* **Public-private key pair** - A pair of keys generated from a cryptographic scheme in which one key is used to encrypt and the other to decrypt such that one key can be shared without revealing the other
* **Seal** - Using an encryption key from a public-private key pair to encrypt messages for which the decryption key is private and the encryption key is public, thereby enabling the message to be sent without the risk of being read by an interceptor, see "Public-private key pair"
* **Secret key** - See "Private key"
* **SEM** - Simple Encrypted Message, Project Liberty's own format for storing and transmitting cryptographic messages, see [Simple Encrypted Formats](https://github.com/Liberty30/admin/wiki/Simple-Encryption-Formats)
* **Sign** - Using an encryption key from a public-private key pair to encrypt messages for which the decryption key is public and the encryption key is private, thereby proving the authenticity of the message, see "Public-private key pair"
* **Social Identity** - A representation of a user, bot or group online, see "User," and "Bot"
* **Social Identity Address** - The contract address of the smart contract we use to represent a social identity in our system, see "Contract address" and "Social Identity"
* **Store** - A means of keeping messages or data for an extended period of time
* **Unseal** - Using a decryption key from a public-private key pair to decrypt messages for which the decryption key is private and the encryption key is public, thereby guaranteeing the message was sent without the risk of being read by an interceptor, see "Public-private key pair"
* **User** - A living being using our application, often human but [not always](https://time.com/4008832/17-dogs-to-follow-on-instagram/)
* **Verify** - Using an decryption key from a public-private key pair to decrypt messages for which the decryption key is public and the encryption key is private, thereby proving the authenticity of the message, see "Public-private key pair"
* **Wrapped Key** - An intermediary, cryptographic key allowing for multiple keys to be used for the same encryption