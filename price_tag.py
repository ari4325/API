import cv2
import numpy as np

img = cv2.imread("F://Legion/UI/PriceTag/sample.jpeg")
hsv_image = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

blue_lower = np.array([110,50,50], np.uint8) 
blue_upper = np.array([130,255,255], np.uint8) 
blue_mask = cv2.inRange(hsv_image, blue_lower, blue_upper) 

kernel = np.ones((5,5), "uint8")
blue_mask = cv2.dilate(blue_mask, kernel) 
res_blue = cv2.bitwise_and(img, img, 
                               mask = blue_mask) 

contours, hierarchy = cv2.findContours(blue_mask, 
                                           cv2.RETR_TREE, 
                                           cv2.CHAIN_APPROX_SIMPLE) 

for pic, contour in enumerate(contours): 
    area = cv2.contourArea(contour)  
    cv2.drawContours(img, contour, -1, (255, 0, 255), 1)
    print(area)
    x, y, w, h = cv2.boundingRect(contour) 
    img = cv2.rectangle(img, (x, y),  
                                (x + w, y + h),  
                                (20, 100, 255), 2) 
        
    cv2.putText(img, "MRP", (x, y), 
                cv2.FONT_ITALIC, 0.8, 
                (0, 0, 255))     
    break


cv2.imshow("Color MRP", img) 
cv2.waitKey(0)