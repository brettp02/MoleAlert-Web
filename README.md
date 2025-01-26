# Mole Alert

MoleAlert is a web app that accuractely classifies benign and malignant moles. It communicates with a [FastAPI-based REST API](https://github.com/brettp02/MoleAlert-Backend). Which uses computer vision in the form of a Resnet50 model which is trained using transfer learning, containerized with Docker and hosted on AWS. The web app uses Next.js 15, tailwind css, shadcn ui, Kinde for auth, Supabase and Prisma for database management and Stripe for payment management. *Note: payment is not currently enforced, and Stripe is in test mode*

### Landing Page
![Landing Page](/public/Landing.png)

### Dashboard
![Dashboard Page](/public/Main.png)

### Accuracy
The AI model has a training accuracy of ~85-90%, which means that predictions are quite accurate. However, there are possibilities for false positives and false negatives. To avoid this ensure your images are high quality, many phones now have a macro lens feature which would give the most accurate results.

### *Disclaimer*
*MoleAlert is not intended to be used as a substitute advice from medical professionals. This is a portfolio project on practising deploying AI models and developing full stack web applications.*
