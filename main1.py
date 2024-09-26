import eel


@eel.expose
def remove_image(image):
    print(f"{image}")
    return image
    



eel.init("site1")  # EEL initialization

eel.start("main1.html", size=(1000, 800))  # Starting the App