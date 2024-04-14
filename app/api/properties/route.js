import connectDB from "@/config/database";
import Property from "@/models/Property";
//GET/api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find();
    return new Response(JSON.stringify(properties, { status: 200 }));
  } catch (error) {
    return new Response("Something might wrong", { status: 500 });
  }
};
export const POST = async (request) => {
  try {
    const formData = await request.formData();
    //Access all value from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    //create propertyData for database
    const propetyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      images,
    };
    console.log(propetyData);
    return new Response(JSON.stringify({ MESSAGE: "Success" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Faild to add property", { status: 500 });
  }
};
