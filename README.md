# online-order-api

# install project

- 1. npm install
- 2. npm run dev เพื่อรันโปรเจค

# DB

- file DB สามารถดาวน์โหลดได้ที่ลิ้งนี้ : https://docs.google.com/spreadsheets/d/1KqGmqlM2-xDUXawH60vywHDdEPZuQ9iY/edit?usp=sharing&ouid=109033291566554728085&rtpof=true&sd=true

# Or DB 

- ถ้าต้องการจะสร้าง DB ที่โปรคเจคให้ไปที่ไฟล์ serve.js และไปที่ function main จะมี comment function clean_Data และ function transform_product โดยให้เปิดให้เปิด comment function clean_Data เพื่อ Clean Data เนื่องจากไฟล์ Data ที่ได้มาตรง Pc มีอักขระพิเศษติดมาด้วยเลยจำเป็นต้อง Clean data ก่อน จากนั้นรันโปรเจค เมื่อ Clean Data เสร็จแล้วให้ปิด comment function clean_Data แล้วเปิด comment function transform_product เพื่อสร้าง DB product จากนั้นรันโปรเจค เมื่อ create product เสร็จแล้วให้ปิด comment function transform_product เป็นอันเสร็จสิ้นในการ Create DB 
