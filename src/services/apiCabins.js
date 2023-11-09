import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://trvprttbvnmvftqshgip.supabase.co/storage/v1/object/public/cabine-images/cabin-001.jpg;
  // https://trvprttbvnmvftqshgip.supabase.co/storage/v1/object/public/cabine-images/0.7771161228567952-cabin-002.jpg
  // https://trvprttbvnmvftqshgip.supabase.co
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabine-images/${imageName}`;
  console.log(imagePath);
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabine-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    console.log(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
